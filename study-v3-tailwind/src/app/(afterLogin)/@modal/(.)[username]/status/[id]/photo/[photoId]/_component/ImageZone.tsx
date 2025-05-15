import { fakerKO as faker } from "@faker-js/faker";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";

export default function ImageZone() {

    const post = {
        Images: [
            {imageId: 1, link: faker.image.urlPicsumPhotos()},
        ]
    }
    return (
        <div className="flex-1 flex flex-col">
            <img src={post.Images[0].link} alt="" className="hidden" />
            <div className="bg-contain bg-no-repeat bg-center flex-1" style={{backgroundImage: `url(${post.Images[0].link})`}} />
            <div className="flex flex-row justify-center items-center">
                <div className="w-[600px] h-[60px]">
                    <ActionButtons white />
                </div>
            </div>
    </div>
    )
}