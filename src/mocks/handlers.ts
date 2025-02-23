import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

function generateDate() {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);
    return faker.date.between({
        from: lastWeek,
        to: Date.now(),
    });
}

const User = [
    { id: "elonmusk", nickname: "Elon Musk", image: "/yRsRRjGO.jpg" },
    { id: "zerohch0", nickname: "제로초", image: "/5Udwvqim.jpg" },
    { id: "d_com", nickname: "디컴", image: "/4Udwvqim.png" },
    { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
];
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
    http.post(`${baseUrl}/api/login`, () => {
        console.log("로그인");
        return HttpResponse.json(User[2], {
            headers: {
                "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
            },
        });
    }),
    http.post(`${baseUrl}/api/logout`, () => {
        console.log("로그아웃");
        return new HttpResponse(null, {
            headers: {
                "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
            },
        });
    }),
    http.post(`${baseUrl}/api/users`, async ({ request }) => {
        console.log("회원가입");
        // return HttpResponse.text(JSON.stringify("user_exists"), {
        //     status: 403,
        // });
        return HttpResponse.text(JSON.stringify("ok"), {
            headers: {
                "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
            },
        });
    }),
    http.get(`${baseUrl}/api/postRecommends`, ({ request }) => {
        const url = new URL(request.url);
        const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
        return HttpResponse.json([
            {
                postId: cursor + 1,
                User: User[0],
                content: `${
                    cursor + 1
                } Z.com is so marvelous. I'm gonna buy that.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 2,
                User: User[1],
                content: `${
                    cursor + 2
                } Z.com is so marvelous. I'm gonna buy that.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 3,
                User: User[0],
                content: `${
                    cursor + 3
                } Z.com is so marvelous. I'm gonna buy that.`,
                Images: [],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 4,
                User: User[0],
                content: `${
                    cursor + 4
                } Z.com is so marvelous. I'm gonna buy that.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                    { imageId: 4, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 5,
                User: User[3],
                content: `${
                    cursor + 5
                } Z.com is so marvelous. I'm gonna buy that.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get(`${baseUrl}/api/followingPosts`, ({ request }) => {
        console.log("팔로우 api 호출");
        const url = new URL(request.url);
        const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
        return HttpResponse.json([
            {
                postId: cursor + 1,
                User: User[0],
                content: `${cursor + 1} Stop following me. I'm too famous.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 2,
                User: User[1],
                content: `${cursor + 2} Stop following me. I'm too famous.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 3,
                User: User[0],
                content: `${cursor + 3} Stop following me. I'm too famous.`,
                Images: [],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 4,
                User: User[0],
                content: `${cursor + 4} Stop following me. I'm too famous.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                    { imageId: 4, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: cursor + 5,
                User: User[3],
                content: `${cursor + 5} Stop following me. I'm too famous.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get(`${baseUrl}/api/search/:tag`, ({ request, params }) => {
        const { tag } = params;
        console.log(params);
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} 검색결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get(`${baseUrl}/api/users/:userId/posts`, ({ request, params }) => {
        const { userId } = params;
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get(`${baseUrl}/api/users/:userId/posts`, ({ request, params }) => {
        const { userId } = params;
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get(`${baseUrl}/api/trends`, ({ request }) => {
        return HttpResponse.json([
            { tagId: 1, title: "제로초", count: 1264 },
            { tagId: 2, title: "원초", count: 1264 },
            { tagId: 3, title: "투초", count: 1264 },
            { tagId: 4, title: "쓰리초", count: 1264 },
            { tagId: 5, title: "포초", count: 1264 },
            { tagId: 6, title: "파이브초", count: 1264 },
            { tagId: 7, title: "식스초", count: 1264 },
            { tagId: 8, title: "세븐초", count: 1264 },
            { tagId: 9, title: "나인초", count: 1264 },
        ]);
    }),
    http.get(`${baseUrl}/api/followRecommends`, ({ request }) => {
        return HttpResponse.json(User);
    }),
    http.get(`${baseUrl}/api/users/:userId`, ({ request, params }) => {
        const { userId } = params;
        const found = User.find((v) => v.id === userId);
        if (found) {
            return HttpResponse.json(found);
        }
        return HttpResponse.json(
            { message: "no_such_user" },
            {
                status: 404,
            }
        );
    }),
    http.get(`${baseUrl}/api/users/:userId/posts`, ({ request, params }) => {
        const { userId } = params;
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} ${userId}의 게시글`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
        ]);
    }),
];
