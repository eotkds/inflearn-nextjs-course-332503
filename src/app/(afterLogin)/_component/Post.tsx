
import style from './post.module.css';
import ActionButtons from './ActionButtons';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostArticle from './PostArticle';
import 'dayjs/locale/ko';
import PostImages from './PostImages';
import { Post as IPost } from '@/model/Post';
dayjs.extend(relativeTime);
dayjs.locale('ko');

type Props = {
  noImage?: boolean;
  post: IPost;
}

export default function Post({noImage, post}: Props) {

    const target = post;
    const stopPropagation = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
    }

    return (
        <PostArticle post={target}>
        <div className={style.postWrapper}>
          <div className={style.postUserSection}>
            <Link href={`/${target.User.id}`} className={style.postUserImage} onClick={stopPropagation}>
              <img src={target.User.image} alt={target.User.nickname}/>
              <div className={style.postShade} />
            </Link>
          </div>
          <div className={style.postBody}>
            <div className={style.postMeta}>
              <Link href={`/${target.User.id}`} onClick={stopPropagation}>
                <span className={style.postUserName}>{target.User.nickname}</span>
                &nbsp;
                <span className={style.postUserId}>@{target.User.id}</span>
                &nbsp;
                ·
                &nbsp;
              </Link>
              <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
            </div>
            <div>{target.content}</div>
              {!noImage &&
                <div>
                  <PostImages post={target} />
                </div>
              }
             <ActionButtons post={target} />
          </div>
        </div>
      </PostArticle>
    );
}