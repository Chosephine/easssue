package com.limemul.easssue.security.jwt;

import com.lemonmul.gamulgamul.entity.user.Role;
import com.lemonmul.gamulgamul.security.auth.PrincipalDetails;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    @Autowired
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);
        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.replace(JwtProperties.TOKEN_PREFIX, "");

        try {
            Role role = Role.valueOf((String)Jwts.parser().setSigningKey(JwtProperties.SECRET).parseClaimsJws(token).getBody().get("role"));
            PrincipalDetails principalDetails = new PrincipalDetails(role);

            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(
                            null,
                            null,
                            principalDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            request.setAttribute("exception", "IllegalArgumentException");
        } catch (SignatureException e) {
            e.printStackTrace();
            request.setAttribute("exception", "SignatureException");
        } catch (ExpiredJwtException e) {
            e.printStackTrace();
            request.setAttribute("exception", "ExpiredJwtException");
        } catch (NullPointerException e) {
            e.printStackTrace();
            request.setAttribute("exception", "NullPointerException");
        } catch (ClassCastException e) {
            e.printStackTrace();
            request.setAttribute("exception", "ClassCastException");
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("exception", "Exception");
        }

        chain.doFilter(request, response);
    }

}
