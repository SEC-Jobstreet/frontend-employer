import { StateProvider } from "../../components/searchresult/context";
import JobListing from "../../components/searchresult/joblisting";

function Search() {
  return (
    <div>
      <div>This is search page</div>
      <StateProvider>
        <JobListing />
      </StateProvider>
    </div>
  );
}

export default Search;
