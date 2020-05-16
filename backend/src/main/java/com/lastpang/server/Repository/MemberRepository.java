package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends CrudRepository<Member, Long> {
    Member findMemberByUsername(String username);
    Member findMemberByEmail(String email);
}
