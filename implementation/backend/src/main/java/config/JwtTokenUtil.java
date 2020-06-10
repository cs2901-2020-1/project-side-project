package config;

import data.entities.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

import static config.Constants.ACCESS_TOKEN_VALIDITY_SECONDS;
import static config.Constants.SIGNING_KEY;
import static config.Constants.AUTHORITIES_KEY;

@Component
public class JwtTokenUtil implements Serializable {

    private static final long serialVersionUID = 1L;

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private static Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SIGNING_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateToken(Usuario user) {
        final String authorities = user.getRole().getName();

        return Jwts.builder()
                .setSubject(user.getEmail())
				.claim(AUTHORITIES_KEY, authorities)
                .setIssuer("SideProject")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY_SECONDS*1000))
                .signWith(SignatureAlgorithm.HS256, SIGNING_KEY)
                .compact();
    }
    
    public static UsernamePasswordAuthenticationToken getAuthentication(final String token,
			final UserDetails userDetails) {
        final Claims claims = getAllClaimsFromToken(token);
        final List<SimpleGrantedAuthority> authorities =
                Arrays.asList(new SimpleGrantedAuthority(claims.get(AUTHORITIES_KEY).toString()));
		return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
	}

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return  (username.equals(userDetails.getUsername())
                        && !isTokenExpired(token));
    }
}