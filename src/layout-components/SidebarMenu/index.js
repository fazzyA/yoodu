import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { listCategories } from '../../Store/actions/restaurantAction';

import { matchPath } from 'react-router-dom';

import PropTypes from 'prop-types';

import { List, Typography } from '@material-ui/core';

import useRouter from 'utils/useRouter';
import SidebarMenuListItem from './SidebarMenuListItem';

const SidebarMenuList = props => {
  const { pages, ...rest } = props;

  return (
    <List className="p-0">
      {pages.reduce(
        (items, page) => reduceChildRoutes({ items, page, ...rest }),
        []
      )}
    </List>
  );
};

SidebarMenuList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array
};

const reduceChildRoutes = props => {
  const { router, items, page, depth } = props;

  if (page.content) {
    const open = matchPath(router.location.pathname, {
      path: page.to,
      exact: false
    });

    items.push(
      <SidebarMenuListItem
        depth={depth}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        open={Boolean(open)}
        title={page.label}>
        <div className="sidebar-menu-children py-2">
          <SidebarMenuList
            depth={depth + 1}
            pages={page.content}
            router={router}
          />
        </div>
      </SidebarMenuListItem>
    );
  } else {
    items.push(
      <SidebarMenuListItem
        depth={depth}
        href={page.to}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        title={page.label}
      />
    );
  }

  return items;
};

const SidebarMenu = props => {
  const { title, pages, className, component: Component, ...rest } = props;
  // console.log('()())()()()()()()()()())()()()(');
  // console.log(pages);
  // console.log(props.restaurantState.categories);
  const router = useRouter();
  const [categoriesPages, setCategoriesPages] = useState([]);

  useEffect(() => {
    if(props.restaurantState.attributes.id)
    (async () => {
      await props.listCategories();
    })();
  }, [props.restaurantState.attributes]);

  useEffect(() => {
    
    console.log(props.restaurantState);
    const cpages = props.restaurantState.categories.map(cat=>{
     return {label: cat.name, description: `Menu ${cat.name} category page`, to: `/category/${cat.id}`} 
    })
    setCategoriesPages(cpages)
    // setCategories(props.restaurantState.categories);
  }, [props.restaurantState.categories]);

  // {label: "Home", description: "Dashboard page", to: "/DashboardDefault"}
  return (
    <Component {...rest} className={className}>
      {title && (
        <Typography className="app-sidebar-heading">{title}</Typography>
      )}
      <SidebarMenuList depth={0} pages={pages} router={router} />
      
      <SidebarMenuList depth={1} pages={categoriesPages} router={router} />
    </Component>
  );
};

SidebarMenu.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string
};

SidebarMenu.defaultProps = {
  component: 'nav'
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  listCategories: () => dispatch(listCategories())
});
export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
