import * as S from "./styled";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { CommentProps, MainDetailProps, StudyModifyType } from "../../types";
import { Comment, Participant, TopicBtn } from "../../common";
import { CommentCreate, StudyApply, StudyCancel, StudyDelete, StudyModify } from "../../Api/find";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BackBtnIcon, DeleteIcon, MemoAloneicon, ModifyIcon } from "../../../public/svg";
import { themedPalette } from "../../styles/global";
import { CommentController } from "../../Utils/lib/urls";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryArray } from "../../Utils/categoryArray";

const HomeDetail = () => {
    const router = useRouter();
    const { data, mutate} = useSWR<MainDetailProps>(`/user${router.asPath}`);
    const { data:CommentData, mutate:mutateComment } = useSWR<CommentProps[]>(CommentController.Comment(router.query.id as string));
    
    const month = data?.date?.slice(5,7);
    const day = data?.date?.slice(8,10);
    const { register, handleSubmit, setValue, watch } = useForm<StudyModifyType>();
    const [isModify, setIsModify] = useState(false);
  
    const [radioBtnColor, setRadioBtnColor] = useState("");

    const [commonValue, setCommonValue] = useState("");
    const SubmitBtnText = data?.isMine ? (isModify ? "수정하기" : "개설자") : (data?.isStatus ? "신청취소" : data?.count?.maxCount === data?.count?.count ? "신청불가" : "신청하기");

    useEffect(() => {
      const Mycategory = categoryArray.filter((i) => i.value === watch().category)[0] || "";
      setRadioBtnColor(Mycategory.color)      
    },[watch().category])

    useEffect(() => {
      if(data?.studyType === "스터디"){
        setValue("maxCount", 4)
      }else {
        setValue("maxCount", undefined)
      }
    },[data?.studyType])

    const onValid:SubmitHandler<StudyModifyType> = async (d) => {
      if(!data?.id) return;
      switch (SubmitBtnText) {
        case "신청하기" :
          const res = await StudyApply(data.id)
          if(res.errorMsg){
            return toast(res.errorMsg,{type:"warning"})
          }
          toast('신청되었습니다', {type:"success" })
          mutate();
          break;
        case "신청취소" :
          await StudyCancel(data.id)
          toast('신청취소되었습니다', {type:"success" })
          mutate();
          break;
        case "수정하기" :
          if(!d.title || !d.content || !d.category || !d.date || !d.maxCount) return toast('다 입력해주세요', {type:"warning" })
          else if(data?.studyType === "컨퍼런스" && ( d.maxCount > 35 || d.maxCount < 15)) return toast('컨퍼런스 인원은 15명부터 35명 입니다' , { type:"warning" })
          await StudyModify(data.id, d.title, d.content, d.category, d.date , d.maxCount)
          toast('수정되었습니다', {type:"success" })
          setIsModify(false)
          mutate()
          break;
      }
    }

    const handleModifyClick = () => {
      if(!data) return;
      setValue("title", data?.title)      
      setValue("content", data?.content)      
      setValue("category", data?.category)      
      setValue("date", data?.date)      
      setValue("maxCount", data?.count.maxCount)
      setIsModify(true)
    }
    
    const handleDeleteClick = async () => {
      if(!data?.id) return toast('id 가 없습니다', {type: 'warning' })
      await StudyDelete(data?.id)
      toast('삭제되었습니다', {type:"success"})
      router.push('/home');
    }

    const handleCommentBtnClick = async () => {
      if(!data?.id) return toast('id 가 없습니다', {type: 'warning' })
      if(!commonValue) return toast('내용을 입력하세요', {type:"warning" })
      await CommentCreate(data?.id , commonValue)
      toast('댓글이 생성되었습니다', {type:"success"})
      setCommonValue("");
      mutateComment();
    }

    return (
      <S.HomeDetailWapper>
        <S.LeftWapper>
        <S.BackBtn onClick={() => router.back()}>
          <BackBtnIcon/>
        </S.BackBtn>
        {
          data?.isMine && 
          <S.ModifyBtn onClick={handleModifyClick}>
            <ModifyIcon />
          </S.ModifyBtn>
        }
        {
          data?.isMine &&
          <S.DeleteBtn onClick={handleDeleteClick}>
            <DeleteIcon />
          </S.DeleteBtn>
        }
        <S.DecsWapper>
          <S.DecsTitle>
            {isModify ? (
              <input type="text" {...register("title")} /> 
            ):(
              data?.title
            )}
          </S.DecsTitle>
          <S.DecsContent>
            {isModify ? (
              <textarea {...register("content")}/> 
            ):(
              data?.content
            )}
        </S.DecsContent>
        <S.SpanWrapper>
          <div>
            {isModify ? (
                <div>
                  <span>전공 : </span>
                  <S.TopicBtns BtnColor={radioBtnColor}>
                    <TopicBtn category={data?.category} MyCategory={"BE"}  onClick={() => setValue("category", "BE")}/>
                    <TopicBtn category={data?.category} MyCategory={"FE"}  onClick={() => setValue("category", "FE")}/>
                    <TopicBtn category={data?.category} MyCategory={"iOS"} onClick={() => setValue("category", "iOS")}/>
                    <TopicBtn category={data?.category} MyCategory={"AOS"} onClick={() => setValue("category", "AOS")}/>
                    <TopicBtn category={data?.category} MyCategory={"기타"} onClick={() => setValue("category", "기타")}/>
                  </S.TopicBtns>
                </div>
              ):(
                data?.category && `전공 : ${data.category}`
              )
            }
          </div>
          <div>
            {isModify ? (
                <div>
                  <span>날짜 : </span>
                  <input type="date" {...register("date")}/>
                </div>
              ):(
                month && day && `날짜 : ${month}월 ${day}일`
              )
            }
          </div>
          <span>{data?.studyType && `장소 : ${data.studyType === "컨퍼런스" ? "시청각실" : "홈베"}`}</span>
          <div>
            {isModify ? (
                data?.studyType === "컨퍼런스" ? (
                  <div>
                    <span>최대인원 : </span>
                    <input type="number" placeholder="인원 수 입력" {...register("maxCount")}/>
                  </div>
                ) : (
                  <div>
                    <span>최대인원 : </span>
                    <input type="number" readOnly {...register("maxCount")}/>
                  </div>
                )
              ) : (
                data?.count && `현재인원 : ${data?.count?.count || "0"}/${data?.count?.maxCount || "4"} 명`
              )
            }
          </div>
          <div>
            <span>{data?.writer && "개설자 :"}</span>
            <span style={{cursor:"pointer", color: themedPalette.profileLink}} onClick={() => {router.push(`/user/${data?.writer?.id}`)}}>{data?.writer && `${ data?.writer?.stuNum} ${data?.writer?.name || ""}`}</span>
          </div>
          </S.SpanWrapper>
        </S.DecsWapper>

        <S.SubmitBtn 
          onClick={handleSubmit(onValid)}
          style={{
            backgroundColor: (SubmitBtnText === "개설자" || SubmitBtnText === "신청불가") ? "#B4B4B4" : SubmitBtnText === "신청하기" ? "#77D6B3" : SubmitBtnText === "신청취소" ? "#F87070" : "#FFBC41" , 
          }}
        >
          {SubmitBtnText}
        </S.SubmitBtn>
        </S.LeftWapper>

        <S.RightWapper>
          {
            data?.list && data.list.length !== 0 || data?.isMine ? (data.list.map((item,index) => (
              <Participant  key={index} stuNum={item.stuNum} id={item.id} name={item.name}/>
            ))
            ) : (
              <MemoAloneicon/>
          )}
          {
            data?.studyType === "스터디"  && data?.count.count > 0 && (data.isStatus || data?.isMine) &&
            <S.CommentInputBox>
              <textarea placeholder="자료를 공유해보세요!(마크다운형식)" value={commonValue} onChange={(e) => setCommonValue(e.target.value)} 
              />
              <S.CommentBtn onClick={handleCommentBtnClick}>올리기</S.CommentBtn>
            </S.CommentInputBox>
          }
          <S.CommentListBox>
          {
            data?.studyType === "스터디" && data?.count.count > 0 && (data.isStatus || data?.isMine) && 
            CommentData?.map((i)=> (
            <Comment
              key={i.id}
              id={i.id}
              comment={i.comment}
              isMine={i.isMine}
              writer={i.writer}
            />
            ))
          }
          </S.CommentListBox>
          </S.RightWapper>

      </S.HomeDetailWapper>
    )
}

export default HomeDetail