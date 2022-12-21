import * as S from "./styled";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { MainDetailProps } from "../../types";
import { Participant } from "../../common";
import { StudyApply, StudyCancel } from "../../Api/find";
import { toast } from "react-toastify";
import { useState } from "react";
import { MemoAloneicon } from "../../../public/svg";

const HomeDetail = () => {
    const router = useRouter();
    console.log(router.asPath);
    const { data,mutate} = useSWR<MainDetailProps>(`${router.asPath}`);
    const month = data?.date.slice(5,7);
    const day = data?.date.slice(9,11);
    const [isStatus , SetIsStatus] = useState(data?.isStatus);
    console.log(data?.list);
    
    const handleApplyClick = async () => {
      if(!data?.id) return toast('id 가 없습니다', {type: 'warning' })
      if(!data.isStatus && !data.isMine){
        const id = data?.id
        await StudyApply(id)
        toast('신청되었습니다', {type:"success" })
        mutate()
        SetIsStatus(true)
      }else if(data.isStatus && !data.isMine) {
        await StudyCancel(data?.id)
        toast('신청취소되었습니다', {type:"success" })
        SetIsStatus(false)
        mutate()
      }
    }

    return (
      <S.HomeDetailWapper>
        <S.LeftWapper>
        <S.BackBtn onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </S.BackBtn>
        <S.DecsWapper>
          <S.DecsTitle>{data?.title}</S.DecsTitle>
          <S.DecsContent>{data?.content}</S.DecsContent>
          <span>{`전공 : ${data?.studyType === "컨퍼런스" ? "conference" : data?.studyType === "스터디" ?  "study" : data?.studyType}`}</span>
          <span>날짜 : {month}월 {day}일</span>
          <span>장소 : {data?.category}</span>
          <span>{`현재인원 : ${data?.count.count}/${data?.count.maxCount} 명`}</span>
          <span>{`개설자 : ${data?.writer.name} ${data?.writer.name}`}</span>
        </S.DecsWapper>
        <S.SubmitBtn onClick={handleApplyClick} style={{backgroundColor: data?.isMine ? "#EFEFEF" : data?.isStatus ? "red" : "#77D6B3" , color: data?.isMine ? "gray" : "white"}}>
          {data?.isMine ? "개설자" : isStatus ? "신청취소" : "신청하기"}</S.SubmitBtn>
        </S.LeftWapper>

        <S.RightWapper>
          {
            data?.list && data.list.length !== 0 ? (data.list.map((item,index) => (
              <Participant  key={index} stuNum={item.stuNum} id={item.id} name={item.name}/>
            ))
            ) : (
              <MemoAloneicon/>
            )}
          </S.RightWapper>

      </S.HomeDetailWapper>
    )
}

export default HomeDetail