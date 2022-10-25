package com.limemul.easssue.security.auth;

import com.limemul.easssue.entity.Role;
import com.limemul.easssue.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class PrincipalDetails implements UserDetails, OAuth2User {

    private String email;

    private String pwd;

    private Role role;

    private Map<String, Object> attributes;

    public PrincipalDetails(User user) {
        this.email = user.getEmail();
    }

    public PrincipalDetails(Role role) {
        this.email = null;
        this.pwd = null;
        this.role = role;
    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> list = new ArrayList<>();
        list.add("ROLE_" + this.getRole().name());

        return list.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getName() {
        return null;
    }

    public static PrincipalDetails of(User user) {
        return new PrincipalDetails(user);
    }

    public static PrincipalDetails of(User user, Map<String, Object> attributes) {
        PrincipalDetails principalDetails = of(user);
        principalDetails.setAttributes(attributes);

        return principalDetails;
    }
}
