import Home from "@/app/(afterLogin)/home/page";

type PhotoModalProps = {
    SearchParams: Promise<{
        username: string;
        id: string;
        photoId: string;
    }>
}

export default function PhotoPage({ SearchParams }: PhotoModalProps) {
    return (
        <Home />
    )
}