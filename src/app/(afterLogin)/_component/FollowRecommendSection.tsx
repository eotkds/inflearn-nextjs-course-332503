"use client";

import { User } from "@/model/User";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import { useQuery } from "@tanstack/react-query";
import FollowRecommend from "./FollowRecommend";

export default function FollowRecommendSection() {

    const {data} = useQuery<User[]>({
        queryKey: ["users", "followRecommends"],
        queryFn: getFollowRecommends,
    });

    console.log(data);

    return (
        data?.map(user => <FollowRecommend key={user.id} user={user} />)
    );
}