import * as S from "./styled";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AtomCurrentPage, AtomSearchValue } from "../../Atoms";
import { useRecoilState } from "recoil";
import { MemoProfileIcon, SearchIcon } from "../../../public/svg";
import useSWR from "swr";
import { Userprops } from "../../types";
import UseToggleTheme from "../../Hooks/UseToggleTheme";
import Link from "next/link";
import { UserController } from "../../Utils/lib/urls";
import ThemeIcon from "../ThemeIcon";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();
  const { data } = useSWR<Userprops>(UserController.UserBase());
  const [,toggle] = UseToggleTheme();
  const [currentPage, setCurrentPage] = useRecoilState(AtomCurrentPage);
  const [searchValue, SetSearchValue] = useRecoilState<{value: string,isClick:boolean}>(AtomSearchValue);
  useEffect(() => {
    setCurrentPage(router.pathname)
  },[router])

  const handleClick = () => {
    if(!searchValue.value) return toast('검색어를 입력해주세요.', {type:"warning"})
    SetSearchValue({...searchValue , isClick:true})   
  }

  return (
    <S.HeaderWapper>  
      <S.LeftWapper>
        <Link href="/home">S&C</Link>
        <div style={{backgroundSize: currentPage === "/home" ? "100% 100%" : "0% 100%"}} onClick={() => router.push('/home')}>홈</div>
        <div style={{backgroundSize: currentPage === "/create" ? "100% 100%" : "0% 100%"}} onClick={() => router.push('/create')}>생성하기</div>
      </S.LeftWapper>
      { 
        currentPage === "/home" ? (
        <S.CenterWapper>
          <input type="text" value={searchValue.value} onChange={(e) => SetSearchValue({...searchValue,value:e.target.value})}  placeholder="검색어를 입력해주세요" 
          onKeyDown={(e:any) => {if (e.key === 'Enter'){handleClick()}}}
          />
          <label onClick={handleClick}><SearchIcon /></label>
        </S.CenterWapper>
        ) : (
          <div/>
        )
      }
      <S.RightWapper>
        <S.DarkModeBtn onClick={toggle}>
          <ThemeIcon/>
        </S.DarkModeBtn>
        <S.ProfileBox onClick={() => router.push(`/user/${data?.id}`)}>
          <MemoProfileIcon/>
        </S.ProfileBox>
      </S.RightWapper>
    </S.HeaderWapper>
  )
}

export default Header