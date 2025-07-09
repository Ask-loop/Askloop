import { useQuery } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api/queryKeys'
import { getTags } from '@/shared/api/question'
import { GetTagsReq } from '@/shared/types'

export const useGetTags = (params: GetTagsReq) => {
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.tags(params),
		queryFn: () => getTags(params),
		placeholderData: keepPreviousData
	})

	return { data, isLoading }
}
