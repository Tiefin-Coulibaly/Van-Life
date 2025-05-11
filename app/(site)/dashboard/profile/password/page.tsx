import SetPassword from "@/components/dashboard/profile/SetPassword"
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const page = async(props:{searchParams:SearchParams}) => {
  const searchParams = await props.searchParams;
  const mode = searchParams.mode;
  return (
    <SetPassword mode={mode as string | string[] | undefined}/>
  )
}

export default page