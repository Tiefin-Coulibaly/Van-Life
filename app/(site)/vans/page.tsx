import { fetchAllVans } from "@/app/lib/data/data"
import Heading1 from "@/components/headings/Heading1"

const page = async () => {
  const vans = await fetchAllVans()
  console.log(vans)
  return (
    <main className="mt-30">
      <Heading1 title="Explore our van options"/>
    </main>
  )
}

export default page