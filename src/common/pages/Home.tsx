import * as React from "react";
import { connect } from "react-redux";
import { changeTitle } from "common/store/title/actions";
import { Store } from "common/store";

interface HomeProps {
    title: string;
    updateTitle: any;
}

const Home = ({title, updateTitle}: HomeProps) => {
    return (
        <div>test</div>
    );
}

const mapStateToProps = (state: Store) => {
    return {
        title: state.title
    };
};

const mapDispatchToProps = {
    updateTitle: changeTitle
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);