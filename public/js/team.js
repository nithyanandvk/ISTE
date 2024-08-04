function showSubTeam(teamId, button) {
    const subTeams = document.querySelectorAll(".main-body");
    subTeams.forEach((team) => (team.style.display = "none"));
    const selectedTeam = document.getElementById(teamId);
    selectedTeam.style.display = "flex";
    const navs = document.querySelectorAll(".tnav");
    navs.forEach(function (nav) {
      nav.classList.remove("active");
    });
    button.classList.add("active");
  }
  