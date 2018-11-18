import * as React from "react";
// const styles = require('./index.less');
const styles = require('./index.less');

export interface HelloProps { name: string; age: any; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    console.log(styles);
    return (<div className={styles.test}>
      Hello name is {this.props.name}, I'm {this.props.age} years old！!
    </div>
    );
  }
}