"use client";

import { useContext } from "react"
import { TapContext } from "@/app/(afterLogin)/home/_component/TapProvider"
import PostRecommends from "./PostRecommends"
import FollowingPosts from "./FollowingPosts"

export default function TabDecider() {
    const {tab} = useContext(TapContext);
    if(tab === "rec"){
        return <PostRecommends />
    }
    return <FollowingPosts />
}