import React from 'react'
import { IssueListItem } from './IssueListItem'
import styles from './IssuesList.module.css'
export const IssuesList = ({ issues, showIssueComments }) => {
  const renderedIssues = issues.map(issue => (
    <li key={issue.id}>
      <IssueListItem {...issue} showIssueComments={showIssueComments} />
    </li>
  ))
  return <ul className={styles.issuesList}>{renderedIssues}</ul>
}
