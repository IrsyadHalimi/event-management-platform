import {
  useState
} from "react";

import {
  useMutation
} from "@tanstack/react-query";

import {
  useAuthStore
} from "../../store/auth.store";

import {
  updateProfileService,
  uploadProfilePictureService,
  changePasswordService
} from "../../services/user.service";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  Input
} from "../../components/ui/input";

import {
  Button
} from "../../components/ui/button";

import { toast }
  from "sonner";

export default function ProfilePage() {
  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  const setUser =
    useAuthStore(
      (state) =>
        state.setUser
    );

  const [name, setName] =
    useState(
      user?.name || ""
    );

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const updateMutation =
    useMutation({
      mutationFn:
        updateProfileService,

      onSuccess: (
        response
      ) => {
        setUser(
          response.data
        );

        toast.success(
          "Profile updated"
        );
      }
    });

  const uploadMutation =
    useMutation({
      mutationFn:
        uploadProfilePictureService,

      onSuccess: (
        response
      ) => {
        setUser(
          response.data
        );

        toast.success(
          "Profile picture updated"
        );
      }
    });

  const passwordMutation =
    useMutation({
      mutationFn:
        changePasswordService,

      onSuccess: () => {
        toast.success(
          "Password changed"
        );

        setOldPassword(
          ""
        );

        setNewPassword(
          ""
        );
      },

      onError: (
        error: any
      ) => {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed"
        );
      }
    });

  const handleUpdateProfile =
    () => {
      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      updateMutation.mutate(
        formData
      );
    };

  const handleUpload =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      const formData =
        new FormData();

      formData.append(
        "profilePicture",
        file
      );

      uploadMutation.mutate(
        formData
      );
    };

  const handleChangePassword =
    () => {
      passwordMutation.mutate(
        {
          oldPassword,

          newPassword
        }
      );
    };

  return (
    <div
      className="
      max-w-2xl
      mx-auto
      space-y-6
    "
    >
      <Card>
        <CardContent
          className="
          p-6
          space-y-4
        "
        >
          <h1
            className="
            text-2xl
            font-bold
          "
          >
            Profile
          </h1>

          <div
            className="
            flex
            flex-col
            items-center
            gap-4
          "
          >
            <img
              src={
                user?.profilePicture
                  ? `http://localhost:5000/uploads/profilePictures/${user.profilePicture}`
                  : "https://placehold.co/120x120"
              }
              alt="profile"
              className="
              w-32
              h-32
              rounded-full
              object-cover
            "
            />

            <Input
              type="file"
              onChange={
                handleUpload
              }
            />
          </div>

          <Input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Name"
          />

          <Input
            value={
              user?.email
            }
            disabled
          />

          <Button
            onClick={
              handleUpdateProfile
            }
            disabled={
              updateMutation.isPending
            }
          >
            Save Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent
          className="
          p-6
          space-y-4
        "
        >
          <h2
            className="
            text-xl
            font-bold
          "
          >
            Change Password
          </h2>

          <Input
            type="password"
            placeholder="Old password"
            value={
              oldPassword
            }
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
          />

          <Input
            type="password"
            placeholder="New password"
            value={
              newPassword
            }
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <Button
            onClick={
              handleChangePassword
            }
            disabled={
              passwordMutation.isPending
            }
          >
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}