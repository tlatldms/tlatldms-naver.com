package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Member;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Long> {
    Member findMemberByUsername(String username);
    Member findMemberByEmail(String email);
}
