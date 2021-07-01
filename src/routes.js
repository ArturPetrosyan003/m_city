import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/signin';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoute from './Components/AuthRoutes/PrivateRoute';
import PublicRoutes from './Components/AuthRoutes/PublicRoutes';
import AdminMatches from './Components/Admin/Matches/index';
import AddEditMatch from './Components/Admin/Matches/AddEditMatch';
import AdminPlayers from './Components/Admin/Players/index';
import AddEditPlayers from './Components/Admin/Players/AddEditPlayers';
import TheTeam from './Components/TheTeam/index';
import TheMatches from './Components/TheMatches/index';
import NotFound from './Components/UI/404';

const Routes = (props) => {
  console.log(props);
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/admin_players/add_player" exact component={AddEditPlayers} />
        <PrivateRoute {...props} path="/admin_players/edit_player/:id" exact component={AddEditPlayers} />
        <PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers} />
        <PrivateRoute {...props} path="/admin_matches/add_match" exact component={AddEditMatch} />
        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch} />
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches} />
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={SignIn} />
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
        <PublicRoutes {...props} restricted={false} path="/the_team" exact component={TheTeam} />
        <PublicRoutes {...props} restricted={false} path="/the_matches" exact component={TheMatches} />
        <PublicRoutes {...props} restricted={false} component={NotFound} />
      </Switch>
    </Layout>
  )
}

export default Routes;
