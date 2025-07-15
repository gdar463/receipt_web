import type { ReactNode } from "react";

import { useAuth } from "@/lib/auth";
import { useSettings } from "@/lib/settings";

import { Separator } from "../ui/separator";

export function ProfileTab() {
  const auth = useAuth();
  const settings = useSettings();

  return (
    <div className="flex flex-col gap-3">
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
        <div className="font-medium">{auth.user?.createdAt.toUTCString()}</div>
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
