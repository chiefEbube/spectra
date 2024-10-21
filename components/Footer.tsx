import Link from "next/link"
import { footerLinks } from "@/data/data"

export default function Footer() {
  return (
    <footer className="bg-black text-[#E3DFDA] w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-10">
          <div className="text-3xl font-bold inter">icode movies</div>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="">
              <h4 className="text-xl font-bold">New here?</h4>
              <p className="text-[#D2D2D2] mt-2 mb-6 text-sm">Subscribe to our newsletter to get updates on our latest offers!</p>
              <div>
                <input type="text" placeholder="Email address" className="bg-white p-2 lg:p-3 rounded-md lg:w-96 mr-2 mb-3 lg:mr-4 outline-none text-sm lg:text-base" />
                <button className="bg-blue-600 text-sm lg:text-base p-2 lg:p-3 lg:w-32 font-medium">Subscribe</button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 lg:mt-0">
              <div>
                <h5 className="font-bold">Categories</h5>
                <ul>
                  {
                    footerLinks.categories.map((link) => (
                      <li className="my-3">
                        <Link href={link.url} className="text-sm text-[#A5A5A6]">{link.text}</Link>
                      </li>
                    ))
                  }

                </ul>
              </div>
              <div>
                <h5 className="font-bold">Company</h5>
                <ul>
                  {
                    footerLinks.company.map((link) => (
                      <li className="my-3">
                        <Link href={link.url} className="text-sm text-[#A5A5A6]">{link.text}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div>
                <h5 className="font-bold">Support</h5>
                <ul>
                  {
                    footerLinks.support.map((link) => (
                      <li className="my-3">
                        <Link href={link.url} className="text-sm text-[#A5A5A6]">{link.text}</Link>
                      </li>
                    ))
                  }

                </ul>
              </div >
            </div >
          </div >
        </div >
      </div >
    </footer >
  )
}
