import { redirect } from 'next/navigation';
import BackButton from './BackButton';

export default function SignupModal() {

  const submit = async (formData: FormData) => {
    "use server";
    console.log(formData);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    if (!formData.get('id')) {
      return { message: 'no_id' };
    }
    if (!formData.get('name')) {
      return { message: 'no_name' };
    }
    if (!formData.get('password')) {
      return { message: 'no_password' };
    }
    if (!formData.get('image')) {
      return { message: 'no_image' };
    }

    let shouldRedirect = false;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: 'post',
        body: formData,
        credentials: 'include',
      })

      if(response.status === 404) {
        return { message: 'no_id' };
      }
      
      if (response.status === 403) {
        return { message: 'user_exists' }
      }
      
      shouldRedirect = true;
    }catch(err){
      console.error(err);
      return;
    }

    if(shouldRedirect){
      redirect('/home');
    }
  }

  return (
    <>
      <div className="w-[100vw] h-full flex justify-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]">
        <div className="bg-white relative top-[5%] max-w-[80vw] min-w-[600px] rounded-[16px] flex flex-col h-[550px]">
          <div className="px-[80px] pt-[36px] pb-[20px] font-bold">
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit} className="flex flex-1 flex-col">
            <div className="flex-1 px-[80px]">
              <div className="flex flex-col h-[56px] relative my-[12px]">
                <label className="w-full inline-block absolute top-0 border border-[rgb(207,217,222)] rounded-[4px] text-[13px] h-[56px] pt-[8px] px-[8px] text-[rgb(83,100,113)] focus-within:text-red-500" htmlFor="id">아이디</label>
                <input id="id" name="id" className="w-full border-none text-[17px] mt-[16px] pt-[12px] px-[8px] pb-[8px] outline-none" type="text" placeholder="" required/>
              </div>
              <div className="flex flex-col h-[56px] relative my-[12px]">
                <label className="w-full inline-block absolute top-0 border border-[rgb(207,217,222)] rounded-[4px] text-[13px] h-[56px] pt-[8px] px-[8px] text-[rgb(83,100,113)] focus-within:text-red-500" htmlFor="name">닉네임</label>
                <input id="name" className="w-full border-none text-[17px] mt-[16px] pt-[12px] px-[8px] pb-[8px] outline-none" type="text" placeholder="" name="name" required/>
              </div>
              <div className="flex flex-col h-[56px] relative my-[12px]">
                <label className="w-full inline-block absolute top-0 border border-[rgb(207,217,222)] rounded-[4px] text-[13px] h-[56px] pt-[8px] px-[8px] text-[rgb(83,100,113)] focus-within:text-red-500" htmlFor="password">비밀번호</label>
                <input id="password" name="password" className="w-full border-none text-[17px] mt-[16px] pt-[12px] px-[8px] pb-[8px] outline-none" type="password" placeholder="" required/>
              </div>
              <div className="flex flex-col h-[56px] relative my-[12px]">
                <label className="w-full inline-block absolute top-0 border border-[rgb(207,217,222)] rounded-[4px] text-[13px] h-[56px] pt-[8px] px-[8px] text-[rgb(83,100,113)] focus-within:text-red-500" htmlFor="image">프로필</label>
                <input id="image" name="image" className="w-full border-none text-[17px] mt-[16px] pt-[12px] px-[8px] pb-[8px] outline-none cursor-pointer" type="file" accept="image/*" />
              </div>
            </div>
            <div className="px-[80px] py-[24px]">
              <button type="submit" className="w-full h-[50px] rounded-[25px] bg-[rgb(15,20,25)] text-white text-[17px] disabled:opacity-50 hover:bg-[rgb(39,44,48)]">가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>)
}