import * as S from "./styled";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { Contant, Header } from "../../common";
import { MemoIntro } from "../../../public/svg";
import { MainPageProps } from "../../types";
import { StudyController } from "../../Utils/lib/urls";
import { AtomSearchValue } from "../../Atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();
    const { data } = useSWR<MainPageProps[]>(StudyController.Study());
    const { data:SearchData,mutate } = useSWR<MainPageProps[]>(StudyController.StudySearch());
    const [searchValue, SetSearchValue] = useRecoilState<{value: string,isClick:boolean}>(AtomSearchValue);
    
    useEffect(() => {
      if(searchValue.isClick){
        SetSearchValue({...searchValue , value:""})
        mutate()
      }
    },[searchValue])

    return (
      <S.HomeWapper>
        <Header/>
        <S.IntroWapper>
          <S.IntroductionWapper>
            <S.IntroTitle>당신의 전공실력을<br/>늘려보세요!</S.IntroTitle>
            <span>컨퍼런스 , 스터디를 통해<br/>학생들과 자신의 지식을<br/>공유해보세요!</span>
            <S.CreateBtn onClick={() => router.push("/create")}>생성하기</S.CreateBtn>
          </S.IntroductionWapper>
          <MemoIntro/>
        </S.IntroWapper>

        <S.ContansWapper>
        <S.ContansMainTitle>12 월 최신글</S.ContansMainTitle>
        <S.Contants>
        {searchValue.isClick === false ? (
            data?.map((item,index) => (
            <Contant
              key={index}
              id={item.id}
              title={item.title}
              category={item.category}
              date={item.date}
              type={item.type}
            />
            ))
          ) : (
            SearchData?.map((item,index) => (
              <Contant
                key={index}
                id={item.id}
                title={item.title}
                category={item.category}
                date={item.date}
                type={item.type}
              />
              ))
        )}
          
        </S.Contants>

        </S.ContansWapper>
      </S.HomeWapper>
    )
}

export default Home