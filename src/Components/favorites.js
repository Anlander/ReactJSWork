import React, {Component} from "react";

class Favorites extends Component {
  constructor (props) {
    super(props);
    this.state = {
      favorites: null,
    }
  }
  componentDidMount() {
    console.log(localStorage);
  }
  render() {
    return (
      <div> </div>
      // <div className="main--home">
      //   // <div className="path-container">
      //   //   <h2>Home{this.state.mainpath.path}</h2>
      //   // </div>
      //   // <table class="table">
      //   //   <thead>
      //   //     <tr>
      //   //       <th scope="col">type</th>
      //   //       <th scope="col">FileName</th>
      //   //       <th scope="col">size</th>
      //   //       <th scope="col">Download</th>
      //   //       <th scope="col">Delete</th>
      //   //     </tr>
      //   //   </thead>
      //   //   <tbody>
      //   //     {this.state.entries.map((x) => {
      //   //       let thumbnail;
      //   //       if (x[".tag"] === "file") {
      //   //         thumbnail = x.thumbnail
      //   //           ? `data:image/jpeg;base64, ${x.thumbnail.thumbnail}`
      //   //           : `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 60 60' style='enable-background:new 0 0 60 60;' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M42.5,22h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,22,42.5,22z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M17.5,16h10c0.552,0,1-0.447,1-1s-0.448-1-1-1h-10c-0.552,0-1,0.447-1,1S16.948,16,17.5,16z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,30h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,30,42.5,30z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,38h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,38,42.5,38z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,46h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,46,42.5,46z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z' style='fill: rgb(0, 126, 229);'/%3E%3C/g%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3C/svg%3E`;
      //   //       } else {
      //   //         thumbnail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' focusable='false' width='40' height='40' viewBox='0 0 40 40' class='mc-icon mc-icon-template-content mc-icon-template-content--folder-small brws-file-name-cell-icon' role='img'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2371B9F4'%3E%3C/path%3E%3Cpath d='M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2392CEFF'%3E%3C/path%3E%3C/g%3E%3C/svg%3E`;
      //   //       }
      //   //       return (
      //   //         <tr>
      //   //           <td scope="rownpm " class="portrait"> <img style={{ width: 50 }} alt="icon" src={thumbnail} /> </td>
      //   //           <td>
      //   //             <Link to={"/home" + x.path_display}>{x.name}</Link>
      //   //           </td>
      //   //           <button onClick={() => this.DeleteArg(x.path_display)}>
      //   //             Delete
      //   //           </button>
      //   //         </tr>
      //   //       );
      //   //     })}
      //   //   </tbody>
      //   //   <button onClick={this.createfolderv2}>New folder </button>
      //   //   <input
      //   //     type="text"
      //   //     value={this.value}
      //   //     onChange={this.getInputValues}
      //   //   />
      //   // </table>
      //   // <form onSubmit={this.onSubmit}>
      //   // <input ref={this.inputRef} type="file" multiple/>
      //   // <button type="submit">Upload</button>
      //   // </form>
      // </div>
    )
  }
}


export default Favorites;
