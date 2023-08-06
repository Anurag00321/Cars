'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages}) => {

    const maxPage = Math.min(totalPages, Math.max(currentPage + 5, 10))
    const minPage = Math.max(1, Math.min(currentPage - 5), maxPage - 9)
    
    const numberedPageItems: JSX.Element[] = []

    const searchParams = useSearchParams()

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const currentFirst = current.get

    const pathname = usePathname()

    for (let page = minPage; page <= maxPage; page++) {
      numberedPageItems.push(
        <Link
        // href={"?page=" + page + current}
        href={`${currentFirst}` + page + current}
        key={page}
        className={``}
        >
        {page}
        </Link>
      )
    }

    return (
        <>
        <p>TEST</p>
            <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <div className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
            {numberedPageItems}
        </div>
        {currentPage > 1 && (
        <Link
          href={"?page=" + (currentPage - 1) + current }
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          {/* <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          Previous
        </Link>)}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <Link
          href={`${currentFirst}` + (currentPage + 1) + current}
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          {/* <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </Link>
      </div>
    </nav>
        </>
    )

}

export default Pagination