import React from 'react'
import classnames from 'classnames'
import Paginate from 'react-paginate'
import styles from './IssuePagination.module.css'
import './IssuePagination.css'
export const IssuePagination = ({ currentPage, pageCount, onPageChange }) => {
  return (
    <div className={classnames('issuesPagination', styles.pagination)}>
      <Paginate
        forcePage={currentPage}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        nextLabel="&rarr;"
        previousLabel="&larr;"
      />
    </div>
  )
}
