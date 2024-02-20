import { SingleTagEditingWindow } from "./components/SingleTagEditingWindow/SingleTagEditingWindow";
import { TagsEditingWindow } from "./components/TagsEditingWindow/TagsEditingWindow";


export default function Home() {
  return (
    <div className="Home">
      <TagsEditingWindow/>
      <br />
      <SingleTagEditingWindow/>
    </div>
  );
}
