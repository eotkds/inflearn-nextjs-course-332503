"use client";

import { use } from "react"
import { TapContext } from "./TapProvider"
import PostRecommends from "./PostRecommends"
import FollowingPosts from "./FollowingPosts"

export default function TabDecider() {
    const {tab} = use(TapContext); // useContext 대신 use 사용
    if(tab === "rec"){
        return <PostRecommends />
    }
    return <FollowingPosts />
}