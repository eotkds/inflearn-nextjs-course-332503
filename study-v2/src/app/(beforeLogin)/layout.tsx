
type Props = {
    children: React.ReactNode,
    modal: React.ReactNode
};

export default function BeforeLoginLayout({children, modal}: Props){
    return(
        <div>
            before 레이아웃
            {children}
            {modal}
        </div>
    );
}