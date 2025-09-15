import { Slot } from "@radix-ui/react-slot";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { type ReactNode, useEffect, useState } from "react";

import googleGIcon from "@/icons/google_g_icon_light.svg";
import googleSigninIcon from "@/icons/google_signin_icon_light.svg";
import type { ApiError } from "@/lib/api/errors";
import { apiAuthUrl, apiStatus, apiUnlink } from "@/lib/api/google";
import { useAuth } from "@/lib/auth";
import type { StatusResponse } from "@/lib/schemas/google";
import { useSettings } from "@/lib/settings";

import { GoogleUnlinkDialog } from "../googleUnlinkDialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const googleEmailCheckKey = "receipts.googleEmailCheck";

export function ProfileTab() {
  const auth = useAuth();
  const settings = useSettings();
  const creationTime = DateTime.fromJSDate(new Date(auth.user!.createdAt!), {
    zone: settings.options?.dateLocale.key,
  }).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const [unlinked, setUnlinked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: res,
    isError,
    refetch: googleEmailRefetch,
  } = useQuery<StatusResponse, ApiError, StatusResponse, string[]>({
    queryKey: ["googleEmail", auth.user?.id ?? "null"],
    queryFn: async () => {
      return await apiStatus(auth.user?.token!);
    },
    enabled: false,
  });

  useEffect(() => {
    if (
      auth.user!.googleEmail == null &&
      !sessionStorage.getItem(googleEmailCheckKey)
    ) {
      googleEmailRefetch();
      if (res?.email == null) {
        sessionStorage.setItem(googleEmailCheckKey, "1");
      } else {
        setUnlinked(false);
      }
      auth.setGoogleEmail(res?.email ?? null);
    }
  }, []);

  async function linkGoogle() {
    const res = await apiAuthUrl(auth.user?.token!);
    window.open(res.url, "_blank");
    sessionStorage.removeItem(googleEmailCheckKey);
    setOpen(true);
  }

  async function afterLinkGoogle() {
    await googleEmailRefetch();
    if (res?.email == null) {
      sessionStorage.setItem(googleEmailCheckKey, "1");
    } else {
      setUnlinked(false);
    }
    auth.setGoogleEmail(res?.email ?? null);
  }

  async function unlinkGoogle() {
    await apiUnlink(auth.user?.token!);
    auth.setGoogleEmail(null);
    setUnlinked(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <GoogleUnlinkDialog
        open={open}
        setOpen={setOpen}
        callback={afterLinkGoogle}
      />
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Name</ProfileSectionTitle>
          <ProfileSectionDesc>The name on your account.</ProfileSectionDesc>
        </ProfileSectionHeader>
        <div className="font-medium">{auth.user?.displayName}</div>
      </ProfileSection>
      <Separator />
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Username</ProfileSectionTitle>
          <ProfileSectionDesc>
            The username associated with your account.
          </ProfileSectionDesc>
        </ProfileSectionHeader>
        <div className="font-medium">{auth.user?.username}</div>
      </ProfileSection>
      <Separator />
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Email</ProfileSectionTitle>
          <ProfileSectionDesc>
            The address associated with your account.
          </ProfileSectionDesc>
        </ProfileSectionHeader>
        <div className="font-medium">
          {settings.options?.streamerMode
            ? "•••••@•••••.•••"
            : auth.user?.email}
        </div>
      </ProfileSection>
      <Separator />
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Created On</ProfileSectionTitle>
          <ProfileSectionDesc>
            The Date you created your account.
          </ProfileSectionDesc>
        </ProfileSectionHeader>
        <div className="font-medium">{creationTime}</div>
      </ProfileSection>
      <Separator />
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Google Link</ProfileSectionTitle>
          <ProfileSectionDesc>Needed to store scans.</ProfileSectionDesc>
        </ProfileSectionHeader>
        {isError || unlinked || auth.user?.googleEmail == null ? (
          <div className="font-medium flex-row flex items-center gap-2">
            <Button
              variant="ghost"
              asChild
              className="p-0 h-auto w-auto"
              onClick={linkGoogle}
            >
              <Slot>
                <img src={googleSigninIcon} />
              </Slot>
            </Button>
          </div>
        ) : (
          <div className="font-medium flex-row flex items-center gap-4">
            <img src={googleGIcon} className="size-8"></img>
            <div className="flex flex-col text-base/snug">
              <span>Linked with</span>
              <span className="font-extralight">
                {settings.options?.streamerMode
                  ? "•••••@•••••.•••"
                  : auth.user?.googleEmail}
              </span>
            </div>
            <Button
              className="ml-auto"
              variant="destructive"
              size="lg"
              onClick={unlinkGoogle}
            >
              Unlink
            </Button>
          </div>
        )}
      </ProfileSection>
    </div>
  );
}

function ProfileSection({ children }: { children: ReactNode }) {
  return (
    <div className="font-dm grid grid-cols-2 items-center px-4 gap-6">
      {children}
    </div>
  );
}

function ProfileSectionHeader({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

function ProfileSectionTitle({ children }: { children: ReactNode }) {
  return <div className="text-base font-medium">{children}</div>;
}

function ProfileSectionDesc({ children }: { children: ReactNode }) {
  return <div className="text-[0.925rem] font-light">{children}</div>;
}
