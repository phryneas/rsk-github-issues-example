import axios from 'axios'
import parseLink from 'parse-link-header'
const isLastPage = pageLinks => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  )
}
const getPageCount = pageLinks => {
  if (!pageLinks) {
    return 0
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10)
  } else {
    return 0
  }
}
export async function getIssues(org, repo, page = 1) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`
  try {
    const issuesResponse = await axios.get(url)
    let pageCount = 0
    const pageLinks = parseLink(issuesResponse.headers.link)
    if (pageLinks !== null) {
      pageCount = getPageCount(pageLinks)
    }
    return {
      pageLinks,
      pageCount,
      issues: issuesResponse.data
    }
  } catch (err) {
    throw err
  }
}
export async function getRepoDetails(org, repo) {
  const url = `https://api.github.com/repos/${org}/${repo}`
  const { data } = await axios.get(url)
  return data
}
export async function getIssue(org, repo, number) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`
  const { data } = await axios.get(url)
  return data
}
export async function getComments(url) {
  const { data } = await axios.get(url)
  return data
}
