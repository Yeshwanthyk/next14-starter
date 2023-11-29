import useSWR from "swr";

import fetcher from "@/utils/fetcher";

const useProject = () => {
  const { data, error, mutate } = useSWR(
    `${process.env.API_ENDPOINT}/user`,
    fetcher
  );

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useProject;
