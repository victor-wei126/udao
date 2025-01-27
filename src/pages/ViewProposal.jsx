import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"

import { useSelector } from 'react-redux';
import { vote } from "../api/EthersApi";
import { GOV_ABI, GOV_ADDRESS } from "../data/config";

function ViewProposalLayout(props) {

  let data = useSelector(state => state.selectedProposal);
  let metamaskProvider = useSelector(state => state.metamaskProvider);

  useEffect(() => {
    document.title = "UDAO - View " + props.name;
  }, []);
  
  let voteAndCheck = async (voteType) => {
    let event = await vote([GOV_ADDRESS, GOV_ABI, metamaskProvider], data.event.proposalId, voteType, "");
  }

  return (
    <>
      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl">{data.metadata.title}</p>
      </div>

      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl mb-2">Votes</p>
        <div className="flex mb-2">
          <ThumbUpOffAltSharp className="mr-2.5"/>
          <p className="mr-2.5">{data.votes.forVotes}</p>
          <ThumbDownOffAltSharp className="mr-2.5"/>
          <p>{data.votes.againstVotes}</p>
        </div>
        <div className="w-full h-2.5 mb-5 rounded-lg bg-red">
          <div className="w-10/12 rounded-r-none h-2.5 mb-5 rounded-lg bg-green"/>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <button className="mr-5 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-green hover:bg-hover-green" onClick={() => voteAndCheck(1) }>Yea</button>
            <button className="w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-red hover:bg-hover-red" onClick={() => voteAndCheck(0) }>Nay</button>
          </div>
          <Link className="w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple" to={"/" + props.name.toLowerCase() + "s"}>Cancel</Link>
        </div>
      </div>
      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl mb-2">Description</p>
          <p>
            {data.metadata.description}
          </p>
      </div>
    </>
  )
}

export default ViewProposalLayout
