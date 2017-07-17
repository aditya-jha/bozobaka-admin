"use strict";

import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from "react-redux";
import App from "./containers/AppContainer";
import AddQuestion from "./containers/AddQuestionContainer";
import Urls from "./models/Urls";
import Manage from "./containers/ManageContainer";
import ManageCourse from "./containers/ManageCourseContainer";
import configureStore from "./store";
import AddTheory from "./containers/AddTheoryContainer";
import ListTheories from "./containers/ListTheoriesContainer";
import ListQuestions from "./containers/ListQuestionsContainer";
import Dashboard from "./components/DashboardComponent";
import PublishContainer from "./containers/PublishContainer";
import PublishModule from "./components/PublishModuleComponent";

require("style-loader!css-loader!./styles/styles.css");
require("style-loader!css-loader!./../node_modules/react-quill/dist/quill.snow.css");

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={Urls.DASHBOARD} component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path={Urls.ADD_QUESTION} component={AddQuestion}/>
                <Route path={Urls.LIST_QUESTIONS} component={ListQuestions}/>
                <Route path={Urls.MANAGE} component={Manage}/>
                <Route path={Urls.MANAGE_COURSE} component={ManageCourse}/>
                <Route path={Urls.ADD_THEORY} component={AddTheory}/>
                <Route path={Urls.LIST_THEORY} component={ListTheories}/>
                <Route path={Urls.REVIEW_QUESTION} component={ListQuestions} status="added"/>
                <Route path={Urls.TRASH} components={ListQuestions} status="trash"/>
                <Route path={Urls.MARKED_LATER} component={ListQuestions} status="later"/>
                <Route path={Urls.DRAFTS} components={ListQuestions} status="draft"/>
                <Route path={Urls.PUBLISH} components={PublishContainer}/>
                <Route path={Urls.PUBLISH_LINK} components={PublishModule}/>
            </Route>
        </Router>
    </Provider>
    ,
    document.querySelector("#app")
);
