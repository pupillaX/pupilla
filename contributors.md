---
layout: default
title: Contributors
permalink: /contributors/
---

# Contributors


<div class="contributors-grid">
  <div class="contributor-card">
    <div class="contributor-photo">
      <img src="{{ '/assets/images/jan-morovic.png' | relative_url }}" alt="Ján Morovic" />
    </div>
    <div class="contributor-info">
      <h2>Ján Morovic</h2>
      <p class="role">Author, co-founder of Pupilla</p>
      
      <div class="bio-section">
        <h3>English</h3>
        <p>Ph.D. Color Science from the University of Derby, UK, Principal Technologist at HP Inc. member of the interdisciplinary centre of study, Abba School. Married with two children and living in the UK.</p>
      </div>
      
      <div class="bio-section">
        <h3>Italiano</h3>
        <p>Ph.D. in Scienza del Colore all'Università di Derby, Regno Unito, Principal Technologist presso HP Inc. e membro del centro interdisciplinare di studi Scuola Abbà. Sposato con due figli vive nel Regno Unito.</p>
      </div>
      
      <div class="contributor-details">
        <p><strong>Expertise:</strong> Color Science, AI, Technology, Interdisciplinary Studies</p>
        <!-- <p><strong>Location:</strong> United Kingdom</p> -->
        <p><strong>Affiliation:</strong> HP Inc., Abba School</p>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="contributor-photo">
      <img src="{{ '/assets/images/peter-morovic.png' | relative_url }}" alt="Peter Morovic" />
    </div>
    <div class="contributor-info">
      <h2>Peter Morovic</h2>
      <p class="role">Author, co-founder of Pupilla</p>
      
      <div class="bio-section">
        <h3>English</h3>
        <p>Ph.D. in Computer Science from the University of East Anglia, Norwich, UK, Principal Technologist at HP Inc. member of the interdisciplinary centre of study, Abba School. Married and living in Catalunya.</p>
      </div>
      
      <div class="bio-section">
        <h3>Italiano</h3>
        <p>Ph.D. in Scienze della Computazione all'Università dell'East Anglia, Regno Unito, Principal Technologist presso HP Inc. e membro del centro interdisciplinare di studi Scuola Abbà. Sposato e vive in Catalogna.</p>
      </div>
      
      <div class="contributor-details">
        <p><strong>Expertise:</strong> Computer Science, Color Science, Mathematics, Interdisciplinary Studies</p>
        <!-- <p><strong>Location:</strong> Catalunya, Spain</p> -->
        <p><strong>Affiliation:</strong> HP Inc., Abba School</p>
      </div>
    </div>
  </div>
</div>

**Interested in contributing?** Visit our [submission guidelines]({{ '/submit/' | relative_url }}) or [contact us]({{ '/contact/' | relative_url }}) directly.

<style>
.contributors-grid {
  display: grid;
  gap: var(--spacing-2xl);
  margin: var(--spacing-2xl) 0;
}

.contributor-card {
  background: var(--background-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-normal);
}

.contributor-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .contributor-card {
    display: flex;
    gap: var(--spacing-2xl);
    align-items: flex-start;
  }
  
  .contributor-photo {
    flex-shrink: 0;
  }
  
  .contributor-info {
    flex: 1;
  }
}

.contributor-photo {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.contributor-photo img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--secondary-color);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
  transition: transform var(--transition-normal);
}

.contributor-photo img:hover {
  transform: scale(1.05);
}

.contributor-info h2 {
  color: var(--primary-color);
  font-size: 1.875rem;
  margin-bottom: var(--spacing-xs);
}

.role {
  color: var(--secondary-color);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.bio-section {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--background-light);
  border-radius: 8px;
  border-left: 4px solid var(--secondary-color);
}

.bio-section h3 {
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bio-section p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0;
}

.contributor-details {
  background: var(--background);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.contributor-details p {
  margin-bottom: var(--spacing-sm);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.contributor-details strong {
  color: var(--text-primary);
  font-weight: 600;
}

@media (max-width: 767px) {
  .contributors-grid {
    gap: var(--spacing-xl);
  }
  
  .contributor-card {
    padding: var(--spacing-lg);
    text-align: center;
  }
  
  .contributor-photo {
    margin-bottom: var(--spacing-md);
  }
  
  .contributor-photo img {
    width: 150px;
    height: 150px;
  }
  
  .bio-section {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .contributor-photo img {
    width: 120px;
    height: 120px;
  }
  
  .contributor-card {
    padding: var(--spacing-md);
  }
}
</style>