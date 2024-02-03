package org.factoriaf5.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import org.factoriaf5.backend.persistence.Member;
import org.factoriaf5.backend.persistence.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/members")
class MemberController {

    private MemberRepository repository;

    public MemberController(@Autowired MemberRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MemberResponse> allMembers() {
        return repository.findAll().stream()
                .map(this::toMemberResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> member(@PathVariable String id) {
        var uuid = UUID.fromString(id);
        return repository.findById(uuid)
                .map(this::toMemberResponse)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @PostMapping
    public MemberResponse addMember(@RequestBody MemberRequest memberRequest) {
        var member = toMember(memberRequest);
        return toMemberResponse(repository.save(member));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MemberResponse> deleteMember(@PathVariable String id) {
        var uuid = UUID.fromString(id);
        return repository.findById(uuid)
                .map(member -> {
                    repository.deleteById(member.getId());
                    return member;
                })
                .map(this::toMemberResponse)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemberResponse> editMember(@PathVariable String id, @RequestBody MemberRequest request) {
        var uuid = UUID.fromString(id);
        return repository.findById(uuid)
                .map(member -> repository.save(toMember(request)))
                .map(this::toMemberResponse)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    private MemberResponse toMemberResponse(Member member) {
        return new MemberResponse(member.getId().toString(), member.getName());
    }

    private Member toMember(MemberRequest request) {
        return new Member(UUID.fromString(request.getId()), request.getName());
    }

}