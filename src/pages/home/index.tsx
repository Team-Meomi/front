import { GetServerSideProps, NextPage } from "next";
import { SWRConfig } from "swr";
import { Shead } from "../../common";
import { Home } from "../../components";
import { UseGetToken } from "../../Hooks";
import { MainPageProps } from "../../types";
import CustomAxios from "../../Utils/lib/CustomAxios";
import { StudyController } from "../../Utils/lib/urls";

const HomePage:NextPage<{fallback: Record<string,MainPageProps[]>}> = ({fallback}) => {
  return (
    <>
      <SWRConfig value={fallback}>
        <Shead seoTitle={'메인페이지'} />
        <Home />
      </SWRConfig>
    </>
  );
}

export const  getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Authorization } = await UseGetToken(ctx);
  
  try {
    const {data} = await CustomAxios.get(StudyController.Study(), {headers: {Authorization}});
    return {
      props: {
        fallback: {
          [StudyController.Study()] : data,
        },
      },
    };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}

export default HomePage