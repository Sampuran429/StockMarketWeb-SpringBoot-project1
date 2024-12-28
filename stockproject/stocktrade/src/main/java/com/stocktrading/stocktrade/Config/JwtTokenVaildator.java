package com.stocktrading.stocktrade.Config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtTokenVaildator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String jwt = request.getHeader(JWTCONSTANT.JWT_HEADER);
        
        // Check if JWT is present and starts with "Bearer "
        if (jwt != null && jwt.startsWith("Bearer ")) {
            // Remove the "Bearer " prefix
            jwt = jwt.substring(7);
        } else {
            // If the token is missing or incorrectly formatted, proceed without processing
            filterChain.doFilter(request, response);
            return;  // Exit the filter early
        }

        try {
            SecretKey key = Keys.hmacShaKeyFor(JWTCONSTANT.SECRET_KEY.getBytes());

            // Parse the claims from the JWT token
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(jwt)
                                .getBody();
            
            String email = String.valueOf(claims.get("email"));
            String authorities = String.valueOf(claims.get("authorities"));

            // Convert the authorities string to a list of GrantedAuthority
            List<GrantedAuthority> authoritiesList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
            
            // Create an Authentication object
            Authentication auth = new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    authoritiesList
            );
            
            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);  // Pass the exception message for better debugging
        }

        // Proceed with the filter chain
        filterChain.doFilter(request, response);
    }
}
