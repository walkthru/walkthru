import styled from 'styled-components'

function GithubIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

const GithubIconStyled = styled(GithubIcon)`
  fill: #d6d3d1;
  width: 1rem;
  height: 1rem;
  &:hover {
    fill: #e7e5e4;
  }
`

const FileBar = styled.div`
  --tw-bg-opacity: 1;
  background-color: rgb(41 37 36 / var(--tw-bg-opacity));
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  gap: 0.5rem;
  justify-content: end;
  display: flex;
  @supports (-webkit-touch-callout: none) and (not (translate: none)) {
    display: -webkit-box;
    -webkit-box-pack: flex-end;
    & > * + * {
      margin-left: 0.5rem;
    }
  }
`

const Ul = styled.ul`
  padding: 0.5rem;
  gap: 0.5rem;
  justify-content: flex-end;
  display: flex;
  list-style: none;
  margin: 0;
  overflow: hidden;
  @supports (-webkit-touch-callout: none) and (not (translate: none)) {
    & > * + * {
      margin-left: 0.5rem;
    }
  }
`

const Li = styled.li`
  background-color: ${(props) =>
    props.fileActive ? 'rgb(68, 64, 60);' : 'none;'}
  color: ${(props) =>
    props.fileActive ? 'rgb(231 229 228);' : 'rgb(168 162 158);'}
  font-size: 0.75rem;
  line-height: 1.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  flex-shrink: 0;
  align-items: center;
  gap: 0.25rem;
  display: ${(props) => (props.fileActive ? 'flex;' : 'none;')}
  &:hover {
    background-color: ${(props) =>
      props.fileActive ? 'rgb(87 83 78);' : 'inherit;'}
  }
  @supports (-webkit-touch-callout: none) and (not (translate: none)) {
    & > * + * {
      margin-left: 0.25rem;
    }
  }
`

const FileName = styled.div`
  display: block;
  ${Li}:hover & {
    display: none;
  }
`

const FilePath = styled.div`
  display: none;
  ${Li}:hover & {
    display: block;
  }
`

function GitHubLink(owner, repo, path) {
  return (
    <a
      href={`https://github.com/${owner}/${repo}/blob/master/${path}`}
      target="_blank"
      rel="noreferrer"
    >
      <GithubIconStyled />
    </a>
  )
}

function FileIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const FileIconStyled = styled(FileIcon)`
  height: 1rem;
  width: 1rem;
`

function WTFileBar({ files, activeFile, config }) {
  return (
    <FileBar>
      <Ul>
        {files.map((file) => (
          <Li key={file.path} fileActive={file.path === activeFile.path}>
            <FileIconStyled />
            <FileName>{file.path.split('/').pop()}</FileName>
            <FilePath>{file.path}</FilePath>
          </Li>
        ))}
      </Ul>
      {/*<GitHubLink owner={config.code.owner} repo={config.code.repo} path={activeFile.path} />*/}
    </FileBar>
  )
}

export default WTFileBar
