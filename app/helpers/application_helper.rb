module ApplicationHelper
  def smartnav
    links = "<div id='nav'><div id='inner-nav'>"
    if @current_user.try(:is_admin)
      links += "<div class='view-users-link'>" + link_to('View users', users_path) + "</div>"
    end

    if @current_user.present?
      links += "<div class='log-out-link'>"
      links += link_to('Logout ' + @current_user.username, session_path(@current_user.id), :data => {:method => :delete}, remote: true)
      links += "</div>"
    else
      links += "<div id='sign-up-link'><a href='/signup'>Sign Up</a></div>"
    end

    links + '</div>'
    links + '</div>'
  end

end
