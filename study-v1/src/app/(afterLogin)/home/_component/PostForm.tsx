'use client'

import { useState, useRef, FormEvent } from 'react'
import style from './postForm.module.css';
import { Session } from "@auth/core/types";
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../../../../model/Post';

type Props = {
  me: Session | null;
};

export default function PostForm({me} : Props) {
    const queryClient = useQueryClient();
    const [content, setContent] = useState('');
    const [preview, setPreview] = useState<Array<{ dataUrl: string, file: File } | null>>([]);
    const imageRef = useRef<HTMLInputElement>(null);

   
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }


    const mutation = useMutation({
      mutationFn: async(e:FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        preview.forEach((item) => {
            if(item){
                formData.append('images', item.file);
            }
        });
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
      },
      onMutate: ()=>{
        // context 에 이전 데이터를 저장
      }, 
      onSuccess: async (response, variables, context) => {
        const newPost = await response.json();
        setContent('');
        setPreview([]);
        if(queryClient.getQueryData(['posts', 'recommends'])){
          queryClient.setQueryData(['posts', 'recommends'], (prevData: {pages:Post[][]}) =>{
            const shallowCopy = {
              ...prevData,
              pages: [...prevData.pages]
            };
            shallowCopy.pages[0] = [...shallowCopy.pages[0]];
            shallowCopy.pages[0].unshift(newPost);
            return shallowCopy;
          });
        }
        if(queryClient.getQueryData(['posts', 'followings'])){
          queryClient.setQueryData(['posts', 'followings'], (prevData: {pages:Post[][]}) =>{
            const shallowCopy = {
              ...prevData,
              pages: [...prevData.pages]
            };
            shallowCopy.pages[0] = [...shallowCopy.pages[0]];
            shallowCopy.pages[0].unshift(newPost);
            return shallowCopy;
          });
        }
      },
      onError: (error) => {
        console.log(error);
        alert('게시글 작성에 실패했습니다.');
      },
    });



    const onClickButton = () => {
        imageRef.current?.click();
    }
  
    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      
      if(e.target.files){
        Array.from(e.target.files).forEach((file, index) =>{
            const reader = new FileReader();
            reader.onload = () => {
              setPreview(prevPreview => {
                const prev = [...prevPreview];
                prev[index] =  {
                  dataUrl: reader.result as string,
                  file,
                };
                return prev;
              });
            }
            reader.readAsDataURL(file);
  
          })
        }
        
    }

    const onRemoveImage = (index: number) => {
      setPreview(prevPreview => {
        const prev = [...prevPreview];
        prev[index] = null;
        return prev;
      });
    }
    return (
        <form className={style.postForm} onSubmit={mutation.mutate}>
        <div className={style.postUserSection}>
          <div className={style.postUserImage}>
            <img src={me?.user?.image} alt={me?.user?.email} />
          </div>
        </div>
        <div className={style.postInputSection}>
          <TextareaAutosize value={content} onChange={onChange} placeholder="무슨 일이 일어나고 있나요?"/>
          <div style={{display: 'flex'}}>
            {preview.map((item, index) => (
              item && (<div key={index} style={{flex: 1}} onClick={() => onRemoveImage(index)}> <img src={item?.dataUrl} alt="미리보기" style={{width: '100%', maxHeight: 100, objectFit: 'contain'}} /> </div>)
            ))}
          </div>
          <div className={style.postButtonSection}>
            <div className={style.footerButtons}>
              <div className={style.footerButtonLeft}>
                <input type="file" name="imageFiles" multiple hidden ref={imageRef} onChange={onChangeImage} />
                <button className={style.uploadButton} type="button" onClick={onClickButton}>
                  <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path
                        d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <button className={style.actionButton} disabled={!content}>게시하기</button>
            </div>
          </div>
        </div>
      </form>
    );
}