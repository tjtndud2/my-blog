---
layout: default
title: Blog
permalink: /blog/
---

<div class="posts-header">
    <h2>모든 포스트</h2>
</div>

<div class="filter-bar">
    <div class="filter-bar-left">
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Search" aria-label="글 검색">
        </div>
        <div class="filter-tags">
            <button class="filter-tag active" data-category="all">전체</button>
            {% for category in site.categories %}
            <button class="filter-tag" data-category="{{ category[0] }}">{{ category[0] }}</button>
            {% endfor %}
        </div>
    </div>
    <div class="visitor-box">
        <div class="visitor-stat">
            <div class="visitor-label">오늘</div>
            <div class="visitor-number" id="todayVisitors">0</div>
        </div>
        <div class="visitor-stat">
            <div class="visitor-label">전체</div>
            <div class="visitor-number" id="totalVisitors">0</div>
        </div>
    </div>
</div>

<ul class="post-list" id="postsList">
    {% for post in site.posts %}
    <li class="post-item"
        data-title="{{ post.title | downcase }}"
        data-summary="{{ post.excerpt | strip_html | downcase | truncate: 200 }}"
        data-categories="{{ post.categories | join: ',' }}">
        <a href="{{ post.url | relative_url }}" class="post-title">{{ post.title }}</a>
        <div class="post-meta">
            {% for category in post.categories %}
            <span class="post-category">{{ category }}</span>
            {% endfor %}
            <span class="post-meta-item">📅 {{ post.date | date: '%Y년 %-m월 %-d일' }}</span>
            {% if post.author or site.author %}
            <span class="post-meta-item">✍️ {{ post.author | default: site.author }}</span>
            {% endif %}
        </div>
        <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
        {% if post.tags.size > 0 %}
        <div class="post-tags">
            {% for tag in post.tags %}
            <span class="post-tag">#{{ tag }}</span>
            {% endfor %}
        </div>
        {% endif %}
    </li>
    {% endfor %}
</ul>

<div class="empty-state" id="emptyState" style="display: none;">
    <p>검색 결과가 없습니다.</p>
</div>
