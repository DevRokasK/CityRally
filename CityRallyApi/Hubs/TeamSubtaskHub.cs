//using Microsoft.AspNetCore.SignalR;
//using System.Threading.Tasks;

//public class TeamSubtaskHub : Hub
//{
//    public async Task SendTeamSubtaskUpdate(int teamId)
//    {
//        await Clients.Group(teamId.ToString()).SendAsync("ReceiveTeamSubtaskUpdate", teamId);
//    }

//    public Task JoinTeamGroup(int teamId)
//    {
//        return Groups.AddToGroupAsync(Context.ConnectionId, teamId.ToString());
//    }

//    public Task LeaveTeamGroup(int teamId)
//    {
//        return Groups.RemoveFromGroupAsync(Context.ConnectionId, teamId.ToString());
//    }
//}