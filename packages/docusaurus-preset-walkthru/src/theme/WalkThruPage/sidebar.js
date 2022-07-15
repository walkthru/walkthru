import React from 'react'

function Sidebar({ tutorials }) {
  return (
    <aside
      className="theme-doc-sidebar-container docSidebarContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocPage-Layout-Sidebar-styles-module">
      <div className="sidebar_node_modules-@docusaurus-theme-classic-lib-theme-DocSidebar-Desktop-styles-module">
        <nav
          className="menu thin-scrollbar menu_node_modules-@docusaurus-theme-classic-lib-theme-DocSidebar-Desktop-Content-styles-module">
          <ul className="theme-doc-sidebar-menu menu__list">
            {tutorials.map(item => (
              <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a
                className={`menu__link ${window.location.pathname === item.path ? 'menu__link--active' : '' }`} aria-current="page" href={ item.path }>{ item.title }</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
