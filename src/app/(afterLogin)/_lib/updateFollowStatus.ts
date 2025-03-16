import { User } from "@/model/User";
import { QueryClient } from "@tanstack/react-query";

type Props = {
    userId: string;
    isFollow: boolean;
    queryClient: QueryClient;
    sessionUserId: string;
    queryKey?: string[];
};

export const updateFollowStatus = ({
    userId,
    isFollow,
    queryClient,
    sessionUserId,
}: Props) => {
    const queryKey_1 = ["users", "followRecommends"];
    const value_1: User[] | undefined = queryClient.getQueryData(queryKey_1);

    if (value_1) {
        const index = value_1.findIndex((user) => user.id === userId);
        const shallow = [...value_1];
        if (index !== -1) {
            shallow[index] = {
                ...shallow[index],
                Followers: isFollow
                    ? [...shallow[index].Followers, { id: sessionUserId }]
                    : shallow[index].Followers.filter(
                          (follower) => follower.id !== sessionUserId
                      ),
                _count: {
                    ...shallow[index]._count,
                    Followers:
                        shallow[index]._count.Followers + (isFollow ? 1 : -1),
                },
            };
            queryClient.setQueryData(queryKey_1, shallow);
        }
    }
    const queryKey_2 = ["users", userId];
    const value_2: User | undefined = queryClient.getQueryData(queryKey_2);
    if (value_2) {
        const shallow = {
            ...value_2,
            Followers: isFollow
                ? [...(value_2?.Followers || []), { id: sessionUserId }]
                : (value_2?.Followers || []).filter(
                      (follower) => follower.id !== sessionUserId
                  ),
            _count: {
                ...value_2._count,
                Followers: value_2._count.Followers + (isFollow ? 1 : -1),
            },
        };
        queryClient.setQueryData(queryKey_2, shallow);
    }
};
