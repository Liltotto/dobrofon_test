import { SingleTagEditingWindow } from "./components/SingleTagEditingWindow/SingleTagEditingWindow";
import { StartPage } from "./components/StartPage/StartPage";
import { TagsEditingWindow } from "./components/TagsEditingWindow/TagsEditingWindow";


export default function Home() {
  return (
    <div className="Home">
      {/* <TagsEditingWindow/>
      <br />
      <SingleTagEditingWindow/>
      <br /> */}
      <StartPage/>
    </div>
  );
}
