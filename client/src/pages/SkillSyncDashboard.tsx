import Topbar from "../components/Topbar";

const SkillSyncDashboard = () => {
  return (
    <div className="flex min-h-screen text-white">
      <div className="flex-1 flex flex-col">
        <Topbar/>

        <div className="flex-1 bg-gradient-to-br from-black via-[#1a0025] to-black p-6">
          
          {/* Power BI Container */}
          <div className="w-full h-[80vh] rounded-xl overflow-hidden shadow-lg border border-gray-800">
            <iframe
              title="it_job_analysis"
              src="https://app.powerbi.com/reportEmbed?reportId=67a922ee-5c83-4b0c-8e59-30c89b12dd40&autoAuth=true&ctid=57f28137-86e8-4b16-b8c0-0450878e29b0&actionBarEnabled=true"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkillSyncDashboard;