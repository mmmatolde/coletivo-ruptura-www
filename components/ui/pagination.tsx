import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "./button"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

interface PaginationWithEllipsisProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams?: Record<string, string>
}

export function PaginationWithEllipsis({ currentPage, totalPages, baseUrl, searchParams = {} }: PaginationWithEllipsisProps) {
  // Helper function to generate a range of numbers
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalPageCount = totalPages;
    const currentPageNumber = currentPage;
    const siblingCount = 1; // how many pages to show before and after the current page

    const totalPageNumbersToShow = siblingCount * 2 + 3; // e.g., 1 ... 4 5 6 ... 10 => siblingCount * 2 + 1 (current) + 2 (first/last)
    const lastPageIndex = totalPageCount;

    // Case 1: If the number of total pages is less than or equal to the page numbers we want to show in total,
    // we are not going to show ellipses and just show all available page numbers.
    if (totalPageCount <= totalPageNumbersToShow) {
      return range(1, totalPageCount);
    }

    // Calculate left and right sibling index and whether to show left/right ellipsis
    const leftSiblingIndex = Math.max(1, currentPageNumber - siblingCount);
    const rightSiblingIndex = Math.min(totalPageCount, currentPageNumber + siblingCount);

    const shouldShowLeftEllipsis = leftSiblingIndex > (siblingCount + 1);
    const shouldShowRightEllipsis = rightSiblingIndex < (totalPageCount - siblingCount);

    // No left ellipsis, only right ellipsis
    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let leftRange = range(1, siblingCount * 2 + 1);
      return [...leftRange, '...', lastPageIndex];
    }

    // Only left ellipsis, no right ellipsis
    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      let rightRange = range(totalPageCount - (siblingCount * 2), totalPageCount);
      return [1, '...', ...rightRange];
    }

    // Both left and right ellipsis
    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...middleRange, '...', lastPageIndex];
    }

    // Default case (should be caught by the first if or other cases)
    return range(1, totalPageCount);
  };

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${baseUrl}?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === 1}
      >
        <Link href={createPageUrl(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">•••</span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            asChild
          >
            <Link href={createPageUrl(page as number)}>
              {page}
            </Link>
          </Button>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === totalPages}
      >
        <Link href={createPageUrl(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
